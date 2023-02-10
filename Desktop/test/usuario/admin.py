from django.utils.safestring import mark_safe
from django.contrib import admin
from .models import Usuario, Pesquisa, Endereco

@admin.register(Usuario)
class Usuario(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'email', 'celular', 'notificacoes', 'data_nascimento', 'created_at')
    list_display_links = ('id', 'nome', 'cpf')
    search_fields = ['nome', 'cpf']

    def __str__(self):
        return self.rede


@admin.register(Endereco)
class Endereco(admin.ModelAdmin):
    list_display = ('usuario', 'endereco', 'cep', 'latitude_cep', 'longitude_cep')
    search_fields = ['endereco', 'cep', 'latitude_cep', 'longitude_cep']

    def __str__(self):
        return self.usuario

@admin.register(Pesquisa)
class Pesquisa(admin.ModelAdmin):
    list_display = ('id', 'Nome_Usuario', 'filtro_aplicado', 'item_pesquisado', 'created_at', 'updated_at')
    list_display_links = ('id',)
    search_fields = ['item_pesquisado', 'Nome_Usuario']

    def Nome_Usuario(self, obj):
        return mark_safe(f'<a href="http://127.0.0.1:8000/admin/usuario/usuario/">{obj.usuario}</a>')

    def __str__(self):
        return self.nome
