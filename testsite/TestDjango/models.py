from django.db import models

# Create your models here.
class Member(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    profile = models.TextField()
    create_date = models.DateTimeField()