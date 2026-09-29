import type { FormEvent } from 'react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select'
import { Separator} from 'src/ui/separator'
import { Text } from 'src/ui/text'

import type {ArticleStateType} from "../../constants/articleProps"

import { defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions
} from "../../constants/articleProps"

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
  onAction: (nextState: ArticleStateType) => void
}

export const ArticleParamsForm = ({onAction}: ArticleParamsFormProps): React.JSX.Element => {
  // стейт для открытия/закрытия формы
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // локальный стейт формы - он будет меняться только по кнопке Сбросить
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  // триггер состояния ArrowButton 
  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen)}

  const handleResetBtn = () => {
    setFormState(defaultArticleState)
    onAction(defaultArticleState)
  }
  const handleSubmitBtn = (e: FormEvent) => {   
    e.preventDefault()
    onAction(formState)
  }

  return (
    <>
      <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
      <aside className={clsx(styles.container, isMenuOpen && styles.container_open)}> 
        <form className={styles.form} onSubmit={handleSubmitBtn} onReset={handleResetBtn}>

        <Text as="h2" size={31} weight={800} uppercase>
          Задайте параметры
        </Text>

          <Select 
            selected={formState.fontFamilyOption} 
            options={fontFamilyOptions}
            onChange={(option) => setFormState({ ...formState, fontFamilyOption: option})}
            title="шрифт"
          />

          <RadioGroup 
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option})}
            title="размер шрифта"
          />

          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState({ ...formState, fontColor: option})}
            title="цвет шрифта"
          />

          <Separator/>

          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => setFormState({ ...formState, backgroundColor: option})}
            title="цвет фона"
          />

          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option})}
            title="ширина контента"
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear"/>
            <Button title="Применить" htmlType="submit" type="apply"/>
          </div>
        </form>
      </aside>
    </>
  );
};
