import React from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import styles from '../projects/ProjectForm.module.css';

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {

  const [ service, setService ] = React.useState({});

  function submit(event) {
    event.preventDefault();
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(event) {
    setService({ ...service, [event.target.name]: event.target.value })
  }

  return (
    <form
    className={styles.form }
    onSubmit={ submit }
    >
      <Input
      type="text"
      text="Nome do serviço"
      name="name"
      placeholder="Insira o nome do serviço"
      handleOnChange={ handleChange }
      />
      <Input
      type="number"
      text="Custo do serviço"
      name="cost"
      placeholder="Insira o total do serviço"
      handleOnChange={ handleChange }
      />
      <Input
      type="text"
      text="Descrição do serviço"
      name="description"
      placeholder="Insira a descrição do serviço"
      handleOnChange={ handleChange }
      />
      <SubmitButton
        text={ btnText }
      />
    </form>
  )
}

export default ServiceForm