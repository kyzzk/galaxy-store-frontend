from django.utils.safestring import mark_safe
from django.contrib import admin
from .models import Farmacia, Endereco, Medicamento, Preco, Feedback
import locale

@admin.register(Farmacia)
class FarmaciaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cnpj', 'rede', 'telefone', 'created_at', 'updated_at')
    list_display_links = ('id', 'cnpj', 'rede')
    search_fields = ('cnpj', 'rede', 'telefone')
    def __str__(self):
        return self.rede

@admin.register(Endereco)
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ('farmacia', 'cep', 'endereco', 'latitude_cep', 'longitude_cep')
    search_fields = ('farmacia', 'cep', 'endereco', 'latitude_cep', 'longitude_cep')
    def __str__(self):
        return self.rede


@admin.register(Medicamento)
class MedicamentoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'Nome_Rede', 'esta_ativo', 'created_at', 'updated_at')
    list_display_links = ('id', 'nome',)
    list_filter = ('esta_ativo',)
    search_fields = ('nome', 'Nome_Rede', 'valor')

    def Nome_Rede(self, obj):
        print(Medicamento.objects.values())
        return mark_safe(f'<a href="http://127.0.0.1:8000/admin/farmacia/farmacia/">{obj.farmacia}</a>')

    def valor(self, obj):
        locale.setlocale(locale.LC_ALL, 'pt_BR')
        return locale.currency(obj.preco, grouping=True)
    def __str__(self):
        return self.nome

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'medicamento', 'positivos', 'negativos',)
    search_fields = ('medicamento', 'positivos', 'negativos',)
    def __str__(self):
        return self.medicamento

@admin.register(Preco)
class PrecoAdmin(admin.ModelAdmin):
    list_display = ('id', 'medicamento', 'preco', 'gratuito', 'desconto', 'porcentagem_desconto')
    search_fields = ('medicamento', 'preco', 'gratuito', 'desconto', 'porcentagem_desconto')
    def __str__(self):
        return self.medicamento