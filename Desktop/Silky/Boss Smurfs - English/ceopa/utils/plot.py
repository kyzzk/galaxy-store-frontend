import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
import pandas as pd

class Plot:
    def __init__(self) -> None:
        pass

    def generate_1_PlotAndSave(_list, name):

        data = {'Cálculo': _list[0], "Física": _list[1], "Biologia": _list[2], "Química": _list[3], "Historia": _list[4], "Arte": _list[5], "Tecnologia": _list[6], "Gestão": _list[7], "Linguagens": _list[8], "Línguas\nEstrangeiras": _list[9]}

        courses = list(data.keys())
        values = list(data.values())

        data_tuples = list(zip(courses,values))
        final_data = pd.DataFrame(data_tuples, columns=['Curso', 'Valor'])
        final_data = final_data.sort_values(by='Valor', ascending=False)
        fig = plt.figure(figsize = (10, 5))

        plt.bar(x='Curso', height='Valor', data=final_data, color='blue', width=0.7)

        plt.ylabel("Pontuação")
        plt.title("Notas em cada àrea (em relação ao questionário respondido).")

        plt.savefig(f'ceopa\generate\{name}.png'.replace(" ", "_"), dpi=fig.dpi)
