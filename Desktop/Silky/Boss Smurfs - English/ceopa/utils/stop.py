from utils.plot import Plot

class Stop:
    def __init__(self) -> None:
        pass

    def run(_list):
        while(True):
            want_to_continue = input("Você deseja avaliar mais um questionário? (S/N) ")
            if (str(want_to_continue).lower().__contains__("n")):
                print("Parando programa.")
                Plot.generate_1_PlotAndSave(_list, "GERAL")
                exit()
                
            elif (str(want_to_continue).lower().__contains__("s")):
                break
        
            else:
                print("Resposta incorreta, tente novamente.")
