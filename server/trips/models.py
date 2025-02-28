from django.db import models
from django.core.validators import URLValidator
# Create your models here.

class Accommodation(models.Model):
  name = models.CharField(max_length=50)
  title = models.CharField(max_length=50)
  subTitle = models.CharField(max_length=100)
  description = models.CharField(max_length=500)
  price = models.CharField(max_length=10)
  image_url =  models.URLField(validators=[URLValidator()])