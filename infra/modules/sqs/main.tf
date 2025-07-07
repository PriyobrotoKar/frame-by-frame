resource "aws_sqs_queue" "video_transcoding_queue" {
  name                      = "${var.app_name}-video-transcoding-queue-${var.env}"
  message_retention_seconds = 86400 # 1 day
  receive_wait_time_seconds = 10
}

data "aws_iam_policy_document" "video_transcoding_queue_policy_document" {
  statement {
    sid    = "AllowS3ToSendMessage"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }

    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.video_transcoding_queue.arn]

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [var.temp_bucket_arn]
    }
  }
}

resource "aws_sqs_queue_policy" "video_transcoding_queue_policy" {
  queue_url = aws_sqs_queue.video_transcoding_queue.id
  policy    = data.aws_iam_policy_document.video_transcoding_queue_policy_document.json
}

resource "aws_sqs_queue" "file_destroyer_queue" {
  name                      = "${var.app_name}-file-destroyer-queue-${var.env}"
  message_retention_seconds = 86400 # 1 day
  receive_wait_time_seconds = 10
}

data "aws_iam_policy_document" "file_destroyer_queue_policy_document" {
  statement {
    sid    = "AllowS3ToSendMessage"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }

    actions   = ["sqs:SendMessage"]
    resources = [aws_sqs_queue.file_destroyer_queue.arn]

    condition {
      test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [var.temp_bucket_arn]
    }
  }
}

resource "aws_sqs_queue_policy" "file_destroyer_queue_policy" {
  queue_url = aws_sqs_queue.file_destroyer_queue.id
  policy    = data.aws_iam_policy_document.file_destroyer_queue_policy_document.json
}
