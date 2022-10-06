def percentage_list(_list, _type, amount):
    new_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for number in _list:
        if (_type == "A"):
            percent = int(number * amount)

            if (number <= 0):
                new_list[_list.index(number)] = 0
            else:
                new_list[_list.index(number)] += percent + number
        else:
            percent = int(number * amount)

            if (number <= 0):
                new_list[_list.index(number)] = 0
            else:
                new_list[_list.index(number)] += number - percent
    
    return new_list

class convert_answer:
    def __init__(self) -> None:
        pass

    def letter_to_points(_list):
        #Notas para cada categoria de matérias.
        new_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        calculo = 0
        fisica = 1
        biologia = 2
        quimica = 3
        historia = 4
        artes = 5
        tecnologia = 6
        gestao = 7
        linguagens = 8
        estrangeiras = 9

        calculo_answer = 18
        fisica_answer = 25
        biologia_answer = 25
        quimica_answer = 30
        historia_answer = 30
        artes_answer = 33
        tecnologia_answer = 28
        gestao_answer = 20
        linguagens_answer = 13
        estrangeira_answer = 30

        if (_list[0] == "A"):
            new_list[calculo] += calculo_answer
            new_list[tecnologia] += tecnologia_answer
        elif (_list[0] == "B"):
            new_list[linguagens] += linguagens_answer
        elif (_list[0] == "C"):
            new_list[linguagens] += linguagens_answer

        if (_list[1] == "A"):
            new_list[calculo] += calculo_answer
            new_list[fisica] += fisica_answer
            new_list[quimica] += quimica_answer
            new_list[tecnologia] += tecnologia_answer
        elif (_list[1] == "B"):
            new_list[biologia] += biologia_answer
            new_list[historia] += historia_answer
            new_list[linguagens] += linguagens_answer
        elif (_list[1] == "C"):
            new_list[artes] += artes_answer
            new_list[gestao] += gestao_answer
            new_list[estrangeiras] += estrangeira_answer
            
        if (_list[2] == "A"):
            new_list[calculo] += calculo_answer
        elif (_list[2] == "B"):
            new_list[linguagens] += linguagens_answer
        elif (_list[2] == "C"):
            new_list[calculo] += calculo_answer
            new_list[linguagens] += linguagens_answer
        elif (_list[3] == "D"):
            new_list[biologia] += biologia_answer

        if (_list[3] == "A"):
            new_list[linguagens] += linguagens_answer
        elif (_list[3] == "B"):
            new_list[gestao] += gestao_answer
        elif (_list[3] == "C"):
            new_list[linguagens] += linguagens_answer
        elif (_list[3] == "D"):
            new_list[artes] += artes_answer
    
        if (_list[4] == "A"):
            new_list[linguagens] += linguagens_answer
        elif (_list[4] == "B"):
            new_list[estrangeiras] += estrangeira_answer
        elif (_list[4] == "C"):
            new_list[estrangeiras] += estrangeira_answer
        elif (_list[4] == "D"):
            pass

        if (_list[5] == "A"):
            new_list[linguagens] += linguagens_answer
            new_list[artes] += artes_answer
            new_list[biologia] += biologia_answer
        elif (_list[5] == "B"):
            new_list[historia] += historia_answer
            new_list[estrangeiras] += estrangeira_answer
        elif (_list[5] == "C"):
            new_list[gestao] += gestao_answer
            new_list[quimica] += quimica_answer
        elif (_list[5] == "D"):
            new_list[tecnologia] += tecnologia_answer
            new_list[calculo] += calculo_answer

        if (_list[6] == "A"):
            new_list[tecnologia] += tecnologia_answer
        elif (_list[6] == "B"):
            new_list[calculo] += calculo_answer
        elif (_list[6] == "C"):
            new_list[linguagens] += linguagens_answer
            new_list[historia] += historia_answer
        elif (_list[6] == "D"):
            new_list[linguagens] += linguagens_answer
            new_list[estrangeiras] += estrangeira_answer

        if (_list[7] == "A"):
            new_list[historia] += historia_answer
            new_list[artes] += artes_answer
        elif (_list[7] == "B"):
            new_list[gestao] += gestao_answer
        elif (_list[7] == "C"):
            new_list[biologia] += biologia_answer
        elif (_list[7] == "D"):
            new_list[tecnologia] += tecnologia_answer
            new_list[linguagens] += linguagens_answer

        if (_list[8] == "A"):
            new_list[linguagens] += linguagens_answer
        elif (_list[8] == "B"):
            new_list[tecnologia] += tecnologia_answer
        elif (_list[8] == "C"):
            new_list[artes] += artes_answer
        elif (_list[8] == "D"):
            pass

        if (_list[9] == "A"):
            new_list[gestao] += gestao_answer
        elif (_list[9] == "B"):
            new_list[linguagens] += linguagens_answer
        elif (_list[9] == "C"):
            new_list[artes] += artes_answer
            new_list[calculo] += calculo_answer

        if (_list[10] == "A"):
            new_list[tecnologia] += tecnologia_answer
        elif (_list[10] == "B"):
            new_list[estrangeiras] += estrangeira_answer
        elif (_list[10] == "C"):
            new_list[linguagens] += linguagens_answer

        if (_list[11] == "A"):
            new_list[artes] += artes_answer
        elif (_list[11] == "B"):
            new_list[calculo] += calculo_answer
        elif (_list[11] == "C"):
            new_list[linguagens] += linguagens_answer
        elif (_list[11] == "D"):
            new_list[gestao] += gestao_answer

        if (_list[12] == "A"):
            new_list[gestao] += gestao_answer
        elif (_list[12] == "B"):
            new_list[linguagens] += linguagens_answer
        elif (_list[12] == "C"):
            new_list[tecnologia] += tecnologia_answer
        elif (_list[12] == "D"):
            new_list[biologia] += biologia_answer

        if (_list[13] == "A"):
            new_list[gestao] += gestao_answer
        elif (_list[13] == "B"):
            new_list[biologia] += biologia_answer
        elif (_list[13] == "C"):
            new_list[biologia] += biologia_answer
        elif (_list[13] == "D"):
            new_list[linguagens] += linguagens_answer

        if (_list[14] == "A"):
            new_list[linguagens] += linguagens_answer
        elif (_list[14] == "B"):
            new_list[gestao] += gestao_answer
        elif (_list[14] == "C"):
            new_list[artes] += artes_answer

        if (_list[15] == "A"):
            new_list[calculo] += calculo_answer
        elif (_list[15] == "B"):
            new_list[gestao] += gestao_answer
        elif (_list[15] == "C"):
            new_list[linguagens] += linguagens_answer
        elif (_list[15] == "D"):
            new_list[artes] += artes_answer

        if (_list[16] == "A"):
            new_list[biologia] += biologia_answer
        elif (_list[16] == "B"):
            new_list[tecnologia] += tecnologia_answer
        elif (_list[16] == "C"):
            new_list[linguagens] += linguagens_answer
        elif (_list[16] == "D"):
            new_list[gestao] += gestao_answer
        
        if (_list[17] == "A"):
            if (new_list[calculo] <= calculo_answer):
                new_list[calculo] = 0
            else:
                new_list[calculo] -= calculo_answer
            
            if (new_list[tecnologia] <= tecnologia_answer):
                new_list[tecnologia] = 0
            else:
                new_list[tecnologia] -= tecnologia_answer

            if (new_list[linguagens] <= linguagens_answer):
                new_list[linguagens] = 0
            else:
                new_list[linguagens] -= linguagens_answer

        elif (_list[17] == "B"):
            if (new_list[calculo] <= calculo_answer):
                new_list[calculo] = 0
            else:
                new_list[calculo] -= calculo_answer

            if (new_list[linguagens] <= linguagens_answer):
                new_list[linguagens] = 0
            else:
                new_list[linguagens] -= linguagens_answer
        elif (_list[17] == "C"):
            if (new_list[calculo] <= calculo_answer):
                new_list[calculo] = 0
            else:
                new_list[calculo] -= calculo_answer

            if (new_list[linguagens] <= linguagens_answer):
                new_list[linguagens] = 0
            else:
                new_list[linguagens] -= linguagens_answer
        elif (_list[17] == "D"):
            new_list[calculo] += calculo_answer

        if (_list[18] == "A"):
            new_list[fisica] += fisica_answer
        elif (_list[18] == "B"):
            new_list[quimica] += quimica_answer
        elif (_list[18] == "C"):
            new_list[biologia] += biologia_answer
        elif (_list[18] == "D"):
            new_list[historia] += historia_answer

        if (_list[18] == "A"):
            new_list = percentage_list(new_list, "A", 0.1)
        elif (_list[18] == "B"):
            new_list = percentage_list(new_list, "D", 0.2)
        elif (_list[18] == "C"):
            new_list = percentage_list(new_list, "A", 0.05)
            
        return new_list