import datetime

import jwt
import json

from env import TOKEN_SECRET
from rest_framework.response import Response
from rest_framework.decorators import api_view

from farmacia.models import Medicamento, Farmacia
from usuario.models import Usuario
from serializers import MedicamentoSerializer, FarmaciaSerializer

from django.forms.models import model_to_dict

@api_view(['GET'])
def get_medicamentos(request):
    medicamentos = Medicamento.objects.all()
    serializer = MedicamentoSerializer(medicamentos, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def get_farmacias(request):
    farmacias = Farmacia.objects.all()
    serializer = FarmaciaSerializer(farmacias, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def login(request):
    try:
        usuario = request.data['usuario']
        try:
            find = Usuario.objects.get(cpf=usuario)
            data = json.dumps(model_to_dict(find, fields=[field.name for field in find._meta.fields]), indent=4,
                              sort_keys=True, default=str)
            data = json.loads(data)
            encode_jwt = jwt.encode(data, TOKEN_SECRET, algorithm='HS256')
            data = {
                "nome": find.nome,
                "exp": datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(seconds=2),
                "token": encode_jwt
            }
            return Response(data)
        except Exception as e:
            print(e)
            return Response(status=400, data={"error": "usuário ou senha inválido."})

    except:
        return Response(status=400, data={'error': "sem usuário."})