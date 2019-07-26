from django import forms
from .choices import CHOICES_ROLE

class RegisteredForm(forms.Form):

    def __init__(self, *args, **kwargs):
        super(RegisteredForm, self).__init__(*args, **kwargs)

    name = forms.CharField(
        max_length=120,
        label='Nome',
        widget=forms.TextInput(
            attrs={
                'required': True,
                'id': 'name_id',
                'placeholder': 'NOME'
            }
        )
    )

    email = forms.EmailField(
        max_length=120,
        label='Email',
        widget=forms.EmailInput(
            attrs={
                'required': True,
                'id': 'email_id',
                'placeholder': 'EMAIL'
            }
        )
    )

    role = forms.ChoiceField(
        label='QUAL O PAPEL QUE VOCÊ DESEMPENHA HOJE?',
        choices=CHOICES_ROLE,
        widget=forms.Select(
            attrs={
                'required': True,
                'id': 'role_id'
            }
        )
    )

    story = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'required': False,
                'id': 'texto',
                'cols': '30',
                'rows':'10',
                'placeholder': 'conte aqui sua história.'
            }
        ),
        required = False
    )
