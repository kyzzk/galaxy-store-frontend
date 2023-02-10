from django.db import models

class Farmacia(models.Model):
    rede = models.CharField(max_length=250, verbose_name="Rede")
    cnpj = models.CharField(max_length=250, verbose_name="CNPJ")
    telefone = models.CharField(max_length=250, verbose_name="Telefone")
    email = models.CharField(max_length=250, verbose_name="E-mail")
    site = models.CharField(max_length=250, verbose_name="Site")
    registro_ms = models.CharField(max_length=250, verbose_name="Registro MS")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado Em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração")

    def __str__(self):
        return self.rede

class Endereco(models.Model):
    farmacia = models.ForeignKey(Farmacia, verbose_name="Fármacia", on_delete=models.CASCADE)
    cep = models.CharField(max_length=250, verbose_name="CEP")
    endereco = models.CharField(max_length=250, verbose_name="Endereço")
    latitude_cep = models.FloatField(verbose_name="Latitude")
    longitude_cep = models.FloatField(verbose_name="Longitude")

    def __str__(self):
        return self.farmacia

class Medicamento(models.Model):
    nome = models.CharField(max_length=250, verbose_name="Nome", blank=True, null=True)
    nome_comercial = models.CharField(max_length=250, verbose_name="Nome Comercial", blank=True, null=True)
    farmacia = models.ForeignKey(Farmacia, on_delete=models.CASCADE, verbose_name="Nome da Farmácia", blank=True, null=True)
    indicacao = models.CharField(max_length=250, verbose_name="Indicação", blank=True, null=True)
    unidade_medida = models.CharField(max_length=250, verbose_name="Unidade de Medida", blank=True, null=True)
    valor_medida = models.FloatField(verbose_name="Valor da Medida", blank=True, null=True)
    principio_ativo = models.CharField(max_length=250, verbose_name="Princípio Ativo", blank=True, null=True)
    dosagem = models.CharField(max_length=250, verbose_name="Dosagem", blank=True, null=True)
    registro_ms = models.CharField(max_length=250, verbose_name="Registro MS", blank=True, null=True)
    codigo_de_barras = models.CharField(max_length=250, verbose_name="Código de Barras", blank=True, null=True)
    classificacao = models.IntegerField(verbose_name="Classificação", blank=True, null=True)
    esta_ativo = models.BooleanField(verbose_name="Está ativo?", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado Em", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração", blank=True, null=True)

    def __str__(self):
        return self.nome


class Preco(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE, verbose_name="Medicamento")
    preco = models.FloatField(verbose_name="Preço", blank=True, null=True)
    gratuito = models.BooleanField(verbose_name="Gratuito?", blank=True, null=True)
    desconto = models.BooleanField(verbose_name="Tem desconto?", blank=True, null=True)
    porcentagem_desconto = models.FloatField(verbose_name="Porcentagem de Desconto", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado Em", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração", blank=True, null=True)

    class Meta:
        verbose_name = 'Preços'
        verbose_name_plural = 'Preços'

    def __str__(self):
        return self.medicamento


class Feedback(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE, verbose_name="Medicamento")
    positivos = models.IntegerField(verbose_name="Positivos", blank=True, null=True)
    negativos = models.IntegerField(verbose_name="Negativos", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado Em", blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Alteração", blank=True, null=True)

    def __str__(self):
        return self.medicamento