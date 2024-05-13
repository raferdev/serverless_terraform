 {
    "Version": "2012-10-17",
    "Statement" : [
      {
        "Action": "sqs:SendMessage",
        "Principal" : "*",
        "Effect": "Allow",
        "Resource": "${resource}",
        "Condition"   : 
        {
          "ArnEquals" : 
          {
            "aws:SourceArn" : "${source_arn}"
          }
        }
      }
    ]
  }