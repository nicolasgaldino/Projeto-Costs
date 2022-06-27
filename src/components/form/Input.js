import styles from './Input.module.css';

const Input = ({ type, text, name, placeholder, handleOnChange, value }) => {
  return (
    <div className={ styles.formControl }>
      <label
      htmlFor={ name }>
        { text }
      </label>
      <input
      id={ name }
      type={ type }
      name={ name }
      placeholder={ placeholder }
      value={ value }
      onChange={ handleOnChange }/>
    </div>
  )
}

export default Input