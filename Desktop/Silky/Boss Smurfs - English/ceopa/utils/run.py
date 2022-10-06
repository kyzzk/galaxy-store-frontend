from utils.stop import Stop
from utils.inputs import Inputs
from utils.convert_answer import convert_answer
from utils.courses import Courses
from utils.plot import Plot
from utils.pdf_generator import pdf_generator


def sumList(_list, _list2):
    new_list = []
    for n in _list:
        sum_of_result = int(n) + int(_list2(_list.index(n)))
        new_list.append(sum_of_result)
    return new_list

class Run:
    def __init__(self) -> None:
        pass

    def __del__(self):
        print("Parando programa.")

    def start():
        total_list = []
        while(True):
            name = Inputs.getName()
            _class = Inputs.getClass()
            print("Nome do Aluno: " + str(name))    
            print("Turma: " + str(_class))


            answers = Inputs.getAnswers()
            points_per_course = convert_answer.letter_to_points(answers)

            if (str(total_list == "[]")):
                total_list = points_per_course
            else:
                sumList(total_list, points_per_course)

            Plot.generate_1_PlotAndSave(points_per_course, name)
            course_number = Courses.getCourseByList(points_per_course)
            course_details = Courses.getCourseDetails(course_number)

            course_name = course_details[0]

            print("\n-==== Resultado ====-\n")
            print("Aluno: " + name)
            print("Curso: " + course_name)
            print("\n=====================")

            pdf_generator.run(name, _class, course_details)

            Stop.run(total_list)

            