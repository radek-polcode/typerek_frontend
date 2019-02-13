import React from 'react'
import Flag from "react-flags"
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher({ changeLanguage, countries, size }) {
  let switchers = 
    <div className={styles.languageSwitchersBox}>
      {Object.keys(countries).map((key, index) => {
      let value = countries[key];
      return(
        <div
          className={styles.languageSwitcher}
          key={index}
          onClick={() => changeLanguage(value.language)}
        >
          <Flag
            name={value.flagCode}
            format="png"
            pngSize={size}
            shiny={false}
            alt=""
            basePath='/img/flags'
          />
        </div>
      )
    })}
    </div>

  return(
    switchers
  )
}
