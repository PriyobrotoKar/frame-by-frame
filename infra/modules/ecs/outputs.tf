output "ecs_cluster_arn" {
  description = "The ARN of the ECS cluster."
  value       = aws_ecs_cluster.ecs_cluster.arn
}

output "ecs_task_definition_arn" {
  description = "The ARN of the ECS task definition."
  value       = aws_ecs_task_definition.video_transcoder_task.arn
}

output "ecs_task_role_arn" {
  description = "The ARN of the ECS task role."
  value       = aws_iam_role.ecs_task_role.arn
}

output "ecs_execution_role_arn" {
  description = "The ARN of the ECS execution role."
  value       = aws_iam_role.ecs_task_execution_role.arn
}
