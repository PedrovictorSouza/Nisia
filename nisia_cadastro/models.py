from django.db import models
from .choices import CHOICES_ROLE

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
        verbose_name='Qual o papel que você desempenha hoje?',
        default='A ESTUDANTE'
    )
    story = models.TextField(blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True, verbose_name='Cadastro efetuado')

    def has_written_story(self):
        return True if self.story else False
    has_written_story.boolean = True
    has_written_story.short_description = 'Escreveu a história?'
    has_written_story.admin_order_field = 'story'
