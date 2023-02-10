from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=250, verbose_name="Nome")
    cpf = models.CharField(max_length=250, verbose_name='CPF')
    hash_senha = models.CharField(max_length=250, verbose_name='Senha Criptografada')
    email = models.EmailField(max_length=250, verbose_name='email')
    data_nascimento = models.DateField(max_length=150, verbose_name="Data de Nascimento")
    celular = models.CharField(max_length=250, verbose_name="Celular")
    numero_colaboracoes = models.IntegerField(verbose_name="Número de Colaborações")
    notificacoes = models.BooleanField(verbose_name="Notificações?")
    tipo_usuario = models.IntegerField(verbose_name="Tipo de Usuário")
    created_at = models.DateTimeField(verbose_name='Registrado Em', auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração")

    def __str__(self):
        return self.nome


class Endereco(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name="Usuário")
    endereco = models.CharField(max_length=250, verbose_name="Endereço")
    latitude_cep = models.FloatField(verbose_name="Latitude CEP")
    longitude_cep = models.FloatField(verbose_name="Longitude CEP")
    cep = models.CharField(max_length=250, verbose_name="CEP")

    def __str__(self):
        return self.usuario

    class Meta:
        verbose_name = 'Endereços'
        verbose_name_plural = 'Endereços'

class Pesquisa(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name="Usuário")
    filtro_aplicado = models.CharField(max_length=500, verbose_name="Filtro Aplicado")
    item_pesquisado = models.CharField(max_length=500, verbose_name="Item Pesquisado")
    created_at = models.DateTimeField(verbose_name='Criado Em', auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração")
    def __str__(self):
        return self.item_pesquisado