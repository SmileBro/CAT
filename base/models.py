from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.CharField(max_length=50)
    score = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pk)+" "+self.game+" "+str(self.score)+" "+str(self.created)
    class Meta:
        ordering = ['-created']