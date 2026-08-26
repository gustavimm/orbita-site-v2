import { useTheme } from '../hooks/useTheme'
import './ThemeToggle.css'

/**
 * Alterna entre Sistema Noturno (padrão) e modo claro.
 * O nó desliza e muda de fase — lua recortada (box-shadow inset) no escuro,
 * sol cheio no claro — em vez de dois ícones separados.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggleTheme}
        aria-label={isLight ? 'Ativar modo escuro' : 'Ativar modo claro'}
      />
      <span className="theme-switch__track" aria-hidden="true" />
    </label>
  )
}
