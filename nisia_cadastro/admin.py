from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Registered, Calendar
from .export import ExportCsvMixin


class HasWrittenStoryListFilter(admin.SimpleListFilter):
    title = _('Escreveu a história')

    parameter_name = 'story'

    def lookups(self, request, model_admin):
        return (
            ('True', _('Sim')),
            ('False', _('Não')),
        )

    def queryset(self, request, queryset):
        if self.value() == 'True':
            return queryset.exclude(story__exact='')
        if self.value() == 'False':
            return queryset.filter(story__exact='')


class RegisteredAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('name', 'email', 'role', 'has_written_story', 'registered_at')
    list_filter = ('role', HasWrittenStoryListFilter, 'registered_at')
    actions = ["export_as_csv"]
    
class CalendarAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('title', 'date_event', 'start_time', 'type_event', 'is_active')
    list_filter = ('title', 'is_active')
    actions = ["export_as_csv"]

admin.site.empty_value_display = 'desconhecido'
admin.site.register(Registered, RegisteredAdmin)
admin.site.register(Calendar, CalendarAdmin)
