from django.db import models
from farmacia.models import Medicamento

class Compra(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE, verbose_name="Medicamento")


    def __str__(self):
        return self.nome
