# Django
from django.db import models
from django.contrib.auth.models import AbstractUser

# inja ma mikhaim az 'model' khod 'django' biaim ers bari konim ta 'model user' khodemun besazim. 
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    fullname = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=11, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        email_username, email = self.email.split('@')
        if self.fullname == "" or self.fullname == None:
            self.fullname = email_username

        super(User, self).save(*args, **kwargs)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='image/', default='default/default.jpg', null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)
    
    def __str__(self):
        if self.fullname:
            return self.fullname
        else:
            return self.user.fullname

    def save(self, *args, **kwargs):
        if self.fullname == "" or self.fullname == None:
            self.fullname = self.user.fullname

        super(Profile, self).save(*args, **kwargs)
