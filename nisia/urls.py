from django.contrib import admin
from django.urls import path
from nisia_cadastro import views

admin.site.site_header = 'Nisia'
admin.site.index_title = 'Nisia Admin'
admin.site.site_title = 'Nisia Admin'

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('form/', views.form, name='form')
]
