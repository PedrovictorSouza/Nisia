from django.contrib import admin
from .models import Registered

class RegisteredAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role')

admin.site.register(Registered, RegisteredAdmin)
