from django.shortcuts import render
from nisia_cadastro.models import Registered
from nisia_cadastro.form import RegisteredForm

def index(request):
    return render(request, 'index.html',
        {'form': RegisteredForm})
