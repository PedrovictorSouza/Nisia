from django.db import models
from .choices import *
from django.utils import timezone

class Registered(models.Model):
    class Meta:
        verbose_name_plural = 'Registrados'

    name = models.CharField(max_length=120, verbose_name='Nome')
    email = models.CharField(max_length=120, verbose_name='Email')
    phone = models.CharField(max_length=15)
    instagram = models.CharField(max_length=20, verbose_name="Instagram", null=True)

    role = models.CharField(
        max_length=50,
        choices=CHOICES_ROLE,
        verbose_name='Com quais perfis você se identifica hoje?',
        default='A ESTUDANTE'
    )
    story = models.TextField(blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True, verbose_name='Cadastro efetuado')

    def has_written_story(self):
        return True if self.story else False
    has_written_story.boolean = True
    has_written_story.short_description = 'Escreveu a história?'
    has_written_story.admin_order_field = 'story'


class Calendar(models.Model):
    class Meta:
        verbose_name_plural = 'Calendário'
    
    title = models.CharField(max_length=120, verbose_name='Título')
    date_event = models.DateField(verbose_name='Dia do evento')
    start_time = models.TimeField(verbose_name='Início do evento')
    end_time = models.TimeField(verbose_name='Término do evento')
    adress = models.CharField(max_length=120, verbose_name='Local do evento')
    description = models.TextField(verbose_name='Descrição do evento')
    type_event = models.CharField(max_length=50,choices=CHOICES_PAYMENT, verbose_name='Tipo do evento?', default='Escolher')
    slug = models.CharField(max_length=120, verbose_name='Link de inscrição')
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
