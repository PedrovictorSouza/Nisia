from django.contrib import admin
from .models import Registered

class RegisteredAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'registered_at')
    list_filter = ('role', 'registered_at')

admin.site.empty_value_display = 'desconhecido'
admin.site.register(Registered, RegisteredAdmin)
