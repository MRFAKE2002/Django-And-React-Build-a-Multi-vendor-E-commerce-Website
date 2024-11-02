# Django
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from shortuuid.django_fields import ShortUUIDField


# inja ma mikhaim az 'model' khod 'django' biaim ers bari konim ta 'model user' khodemun besazim.
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    fullname = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=11, unique=True, blank=True, null=True)
    otp = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


# dar inja miaim az 'signals' estefade mikonim va migim ghabl az 'save' shodan 'model' bia in 'function' ro seda bezan.
@receiver(pre_save, sender=User)
def set_fullname(sender, instance, **kwargs):
    if not instance.fullname:
        email_username, _ = instance.email.split("@")
        instance.fullname = email_username


class Profile(models.Model):
    """
    chon ma inja az 'OneToOneField' estefade kardim 'Django' default miad 'related_name' misaze yani yek field dar User misaze
    be esm 'profile' dige ma niazi nist 'related_name' moshakhas konim.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(
        upload_to="image/", default="default/default.jpg", null=True, blank=True
    )
    about = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)

    pid = ShortUUIDField(
        unique=True, length=10, max_length=20, alphabet="abcdefghijklmnopqrstuvxyz"
    )

    def __str__(self):
        # dar inja migim age 'fullname' dar 'model User' hast estefade kon age na az 'method get_full_name' estefade kon ke miad 'first_name va last_name' ro mizar.
        return self.user.fullname or self.user.get_full_name()


"""
    dar in signal 'sender' mishe oun 'model' ke 'data' azash miad ke mishe 'User'.
    'instance' mishe oun object az 'model' ke be tazegi 'zakhire' shode; ke inja mishe oun user ke be tazegi 'zakhire' ya 'update' shode.
    'created' ham ye 'boolean' ke miporse object 'create' shode ya 'update' shode ke age 'True' bashe yani 'create' shode.
    
    kar in 'signal' sakht 'Profile' baraye har 'User' zaman 'create' ast.
"""


@receiver(post_save, sender=User)
def create_profile_user(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


"""
    dar in signal 'sender' mishe oun 'model' ke 'data' azash miad ke mishe 'User'.
    'instance' mishe oun object az 'model' ke 'update' shode.
    
    kar in 'signal' zakhire data 'update' shode dar 'profile' har 'user' ast. .
"""


@receiver(post_save, sender=User)
def save_profile_user(sender, instance, **kwargs):
    instance.profile.save()
