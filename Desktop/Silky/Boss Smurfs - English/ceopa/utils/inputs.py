


class Inputs:
    def __init__(self) -> None:
        pass

    def getClass():
        return input("Qual o ano e turma do aluno? ")
    def getName():
        return input("Qual o nome do aluno? ")

    def getAnswers():
        list_of_answers = []
        for i in range(1, 21):
            while(True):
                resposta = input("\nQuestão número (" + str(i) + ")\nResposta: ").upper()

                if (resposta == "A" or resposta == "B" or resposta == "C" or resposta == "D"):
                    list_of_answers.append(resposta)
                    break
                else:
                    print("\nResposta inválida, tente novamente.")                

        return list_of_answers