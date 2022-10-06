from fpdf import FPDF

class pdf_generator():
    def __init__(self) -> None:
        pass

    def run(name, _class, course_info):
        pdf = FPDF(orientation='P', unit='mm', format='A4')
        pdf.add_page()

        pdf.set_xy(10.0, 6.0)
        pdf.image('ceopa\\assets\\img\\gi-logo.jpg', w=700/20, h=450/20)

        pdf.set_xy(0.0, 0.0)
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(w=210.0, h=40.0, align='C', txt="Teste Vocacional CEOPA - RESULTADOS!")

        pdf.set_line_width(0.0)
        pdf.set_line_width(0.0)
        pdf.line(5.0,5.0,205.0,5.0)
        pdf.line(5.0,292.0,205.0,292.0)
        pdf.line(5.0,5.0,5.0,292.0) 
        pdf.line(205.0,5.0,205.0,292.0) 

        pdf.line(5.0, 34, 205, 34)
        pdf.line(5.0, 64, 205, 64)
        pdf.line(5.0, 160, 205, 160)

        pdf.set_xy(20.0, 45.0)
        pdf.set_font('Arial', '', 12)
        pdf.multi_cell(0, 5, txt=f"Aluno: {name}\nTurma: {_class}")

        pdf.set_xy(20.0, 50.0)
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(w=50.0, h=50.0, align='L', txt=f"{course_info[0]}")

        pdf.set_xy(20.0, 62.0)
        pdf.set_font('Arial', '', 10)
        pdf.cell(w=50.0, h=50.0, align='L', txt=" ---- Informações sobre o curso ----")

        pdf.set_xy(20.0, 100.0)
        pdf.multi_cell(0, 5, txt=f"Tipo: {course_info[1]}\nDuração: {course_info[2]}\nSetor: {course_info[3]}\nTurmas: {course_info[4]}\nVagas: {course_info[5]}\n\n\nMédia Salarial: {course_info[6]}\nExemplos de cargos exercidos por essa área: {course_info[7]}, {course_info[8]}, {course_info[9]}.")

        pdf.set_xy(0.0, 150.0)
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(w=210.0, h=40.0, align='C', txt=f"Suas Notas em Cada Área")

        pdf.set_xy(40.0, 180.0)
        pdf.image(f'ceopa\generate\{str(name).replace(" ", "_")}.png', w=700/5, h=450/5)

        pdf.set_xy(7.0, 276.5)
        pdf.set_font('Arial', '', 8)
        pdf.cell(w=0.0, h=0.0, align='L', txt=f"Pesquisa realizada pelos alunos de Gestão da Informação (UFPR): Guilherme Moraes Seguro, Adrian Gabriel Oliveira de Souza, Arthur Basso dos Santos")


        pdf.output(f'ceopa\\generate\\{str(name).replace(" ", "_")}.pdf', 'F')