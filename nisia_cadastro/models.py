from django.db import models

class Registered(models.Model):
    class Meta:
        verbose_name_plural = 'Registrados'

    CHOICES_ROLE = [
        ('A ESTUDANTE', 'A ESTUDANTE'),
        ('A EDUCADORA', 'A EDUCADORA'),
        ('A EMPREGADORA', 'A EMPREGADORA'),
        ('A MENTORA', 'A MENTORA'),
        ('A PROFISSIONAL', 'A PROFISSIONAL')
    ]
    name = models.CharField(max_length=120, verbose_name='Nome')
    email = models.CharField(max_length=120, verbose_name='Email')
    role = models.CharField(
        max_length=50,
        choices=CHOICES_ROLE,
        verbose_name='Qual o papel que você desempenha hoje?',
        default='A ESTUDANTE'
    )
    story = models.TextField(blank=True, null=True)
