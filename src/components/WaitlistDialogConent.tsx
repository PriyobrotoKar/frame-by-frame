"use client";
import { Mail, User } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { joinWaitlist } from "@/app/actions/joinWaitlist";
import { WaitlistForm, waitlistFormSchema } from "@/lib/schema";
import { useState } from "react";
import { toast } from "sonner";

export default function WaitlistDialogContent() {
  const [values, setValues] = useState<WaitlistForm>({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      const parsedData = waitlistFormSchema.parse(values);
      await joinWaitlist(parsedData);
      setIsSuccess(true);
    } catch (e) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="w-[90%] rounded-lg md:max-w-2xl gap-10 px-6 py-16 md:px-20 ">
      <DialogHeader className="space-y-6">
        {isSuccess ? (
          <>
            <DialogTitle className=" text-h1 text-primary">
              You are waitlisted
            </DialogTitle>
            <DialogDescription>
              Keep and eye on your inbox, for further updates.
            </DialogDescription>
          </>
        ) : (
          <>
            <DialogTitle className=" text-h1 text-primary">
              Ready to join the ultimate editing course?
            </DialogTitle>
            <DialogDescription>
              Enter your name and email below to avail an exclusive{" "}
              <span className="font-bold">60% off</span> on the ultimate remote
              editing course.
            </DialogDescription>
          </>
        )}
      </DialogHeader>
      {!isSuccess && (
        <>
          <div className="flex gap-5 flex-wrap justify-center ">
            <div className="relative">
              <User className="absolute size-5 left-5 top-1/2 -translate-y-1/2" />
              <Input
                value={values.name}
                onChange={(e) => {
                  setValues((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  });
                }}
                className="border-none pl-12 text-md py-4 bg-transparent focus-visible:ring-transparent shadow-none"
                autoComplete="name"
                placeholder="Joshua Brown"
              />
            </div>
            <div className="relative">
              <Mail className="absolute size-5 left-5 top-1/2 -translate-y-1/2" />
              <Input
                value={values.email}
                onChange={(e) => {
                  setValues((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
                className="border-none pl-12 text-md py-4 bg-transparent focus-visible:ring-transparent shadow-none"
                type="email"
                autoComplete="email"
                placeholder="joshuahere@gmail.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} onClick={submit}>
              Yes count me in
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}
