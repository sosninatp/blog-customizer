import { defaultArticleState } from '@/constants/articleProps.ts'; ////а надо ли взять еще и новый???

import type {ArticleStateType} from "../../constants/articleProps"

import { clsx } from 'clsx';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

import { useState } from 'react';

export const App = (): React.JSX.Element => {

const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)

return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onAction={setArticleState}/> 
      <Article />
    </main>
);
};
