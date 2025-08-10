FROM public.ecr.aws/lambda/nodejs:20 AS base

# Install pnpm
RUN npm install -g pnpm
ENV PNPM_HOME="/tmp/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# -------- Build Stage --------
FROM base AS builder
WORKDIR /var/task

# Install Turbo
RUN pnpm install -g turbo@^2

# Copy source code
COPY . .

# Prune monorepo for the api
RUN turbo prune api --docker

# -------- Installer Stage --------
FROM base AS installer
WORKDIR /var/task

# Copy the json files from the builder stage
COPY --from=builder /var/task/out/json/ .

# Install Turbo
RUN pnpm install -g turbo@^2

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the source files
COPY --from=builder /var/task/out/full/ .

# Build the app
RUN turbo run build

# -------- Final Stage --------
FROM base AS runner
WORKDIR /var/task

# Copy the built app from the installer stage
COPY --from=installer /var/task .

RUN mkdir -p /tmp/pnpm/.tools/pnpm && chmod -R 777 /tmp/pnpm

CMD ["apps/api/dist/lambda.handler"]
