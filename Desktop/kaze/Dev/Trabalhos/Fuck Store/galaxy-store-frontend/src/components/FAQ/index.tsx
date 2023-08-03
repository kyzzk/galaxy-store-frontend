import React, { useState } from 'react';
import styles from './Faq.module.css';

const Faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const faqList = [
    {
      question: 'Quais as formas de pagamento?',
      answer: 'Aceitamos cartões de crédito e boleto bancário como formas de pagamento.',
    },
    {
      question: 'As contas possuem garantia?',
      answer: 'Sim, todas as contas possuem garantia de autenticidade e funcionalidade.',
    },
    {
      question: 'Demora quanto tempo para a conta chegar?',
      answer: 'O prazo de entrega varia de acordo com a forma de envio selecionada. Normalmente, as contas são entregues dentro de 24 horas após a confirmação do pagamento.',
    },
    {
      question: 'Tenho outras dúvidas, o que posso fazer?',
      answer: 'Caso tenha outras dúvidas, entre em contato conosco através do nosso suporte por e-mail ou telefone. Estamos disponíveis para ajudar.',
    },
  ];

  const handleToggleAnswer = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Perguntas Frequentes (FAQ)</h1>
      <div className={styles.faqList}>
        {faqList.map((faq, index) => (
          <div className={styles.faqItem} key={index}>
            <div className={styles.question} onClick={() => handleToggleAnswer(index)}>
              <span>{faq.question}</span>
              <div className={styles.plusButton}>
                {expandedIndex === index ? '-' : '+'}
              </div>
            </div>
            {expandedIndex === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
