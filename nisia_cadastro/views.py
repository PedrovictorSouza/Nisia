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
            registered_person.phone = register_form.cleaned_data['phone']
            registered_person.role = register_form.cleaned_data['role']
            registered_person.story = register_form.cleaned_data['story']
            try:
                person_db = Registered.objects.get(email=register_form.cleaned_data['email'])
                msg = {"status": 400, "result": "Você já está cadastrada"}
                return HttpResponse(json.dumps(msg), status=400)
            except:
                registered_person.save()
                msg = {"status": 200, "result": "Cadastrada com sucesso!"}
                return HttpResponse(json.dumps(msg), status=200)
        else:
            msg = {"status": 400, "result": "Dados inválidos"}
            return HttpResponse(json.dumps(msg), status=400)
    else:
        msg = {"status": 405, "result": "Erro inesperado, entre em contato conosco"}
        return HttpResponse(json.dumps(msg), status=500)
