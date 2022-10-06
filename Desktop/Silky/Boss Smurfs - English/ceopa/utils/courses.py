import json

class Courses:
    def __init__(self) -> None:
        pass

    def getCourseByList(_list):
        with open('ceopa\\assets\\data.json', encoding="utf-8") as file_data:
            json_courses = json.load(file_data)

            cursos_list = []
            for courses in json_courses:
                calculo = int(json_courses[f'{courses}'][0]['calculo'])       
                fisica = int(json_courses[f'{courses}'][0]['fisica'])      
                biologia = int(json_courses[f'{courses}'][0]['biologia'])      
                quimica = int(json_courses[f'{courses}'][0]['quimica'])      
                historia = int(json_courses[f'{courses}'][0]['historia'])      
                artes = int(json_courses[f'{courses}'][0]['artes'])      
                tecnologia = int(json_courses[f'{courses}'][0]['tecnologia'])      
                gestao = int(json_courses[f'{courses}'][0]['gestao'])      
                linguagens = int(json_courses[f'{courses}'][0]['linguagens'])      
                estrangeiras = int(json_courses[f'{courses}'][0]['estrangeiras'])     

                cursos_list.append([calculo, fisica, biologia, quimica, historia, artes, tecnologia, gestao, linguagens, estrangeiras]) 


            curso_counter = 0
            resultados = []

            for curso in cursos_list:

                curso_counter += 1
                counter = 0
                diff = 0

                for resposta in _list:
                    counter += 1

                    if (_list[counter - 1] >= curso[counter - 1]):
                        resposta = _list[counter - 1] - curso[counter - 1]
                    else:
                        resposta = curso[counter - 1] - _list[counter - 1]

                    diff += resposta

                resultados.append(diff)

            number_on_list = resultados.index(min(resultados))
            print("\nA menor diferença das notas é: " + str(min(resultados)) + ", número na lista: " + str(number_on_list))

            return number_on_list




    def getCourseDetails(number):
        details_list = []

        with open('ceopa\\assets\\info.json', encoding="utf-8") as file_data:
            json_courses = json.load(file_data)

            details_list.append(json_courses[f'{number}'][0]['nome'])
            details_list.append(json_courses[f'{number}'][0]['tipo'])
            details_list.append(json_courses[f'{number}'][0]['durac'])
            details_list.append(json_courses[f'{number}'][0]['setor'])
            details_list.append(json_courses[f'{number}'][0]['turnos'])
            details_list.append(json_courses[f'{number}'][0]['vagas'])
            details_list.append(json_courses[f'{number}'][0]['med_salarial'])
            details_list.append(json_courses[f'{number}'][0]['cargo_1'])
            details_list.append(json_courses[f'{number}'][0]['cargo_2'])
            details_list.append(json_courses[f'{number}'][0]['cargo_3'])

        return details_list