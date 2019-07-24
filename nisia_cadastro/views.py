from django.shortcuts import render, redirect
from django.http import HttpResponse
from nisia_cadastro.models import Registered
from nisia_cadastro.form import RegisteredForm
import json

def index(request):
    return render(request, 'index.html',
        {'form': RegisteredForm})

def form(request):
    msg = {}
    if request.method == 'POST':
        register_form = RegisteredForm(json.loads(request.body))
        if register_form.is_valid():
            registered_person = Registered()
            registered_person.name = register_form.cleaned_data['name']
            registered_person.email = register_form.cleaned_data['email']
            registered_person.role = register_form.cleaned_data['role']
            registered_person.story = register_form.cleaned_data['story']
            registered_person.save()
            msg = {"result": "Usuário Registrado"}
            return HttpResponse(msg, status=200)
        else:
            msg = {"result": "Dados inválidos"}
            return HttpResponse(msg, status=400)
    else:
        msg = {"result": "Método inválido"}
        return HttpResponse(msg, status=500)
