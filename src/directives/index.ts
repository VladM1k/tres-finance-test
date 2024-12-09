import type { DirectiveBinding } from 'vue'

export const vTooltip = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltip = document.createElement('div') as HTMLElement

    el.style.position = 'relative'

    tooltip.style.padding = '4px 8px'
    tooltip.style.borderRadius = '6px'
    tooltip.style.backgroundColor = '#35383C'
    tooltip.style.position = 'absolute'
    tooltip.style.zIndex = '-1'
    tooltip.style.visibility = 'hidden'

    const textContent = document.createElement('p')

    textContent.style.color = '#fff'
    textContent.style.fontSize = '14px'
    textContent.style.whiteSpace = 'nowrap'
    textContent.style.fontWeight = '400'
    textContent.style.lineHeight = '21px'

    textContent.innerText = binding.value

    tooltip.appendChild(textContent)

    const tooltipArrow = document.createElement('div') as HTMLElement

    tooltipArrow.style.position = 'absolute'
    tooltipArrow.style.top = '100%'
    tooltipArrow.style.left = '50%'
    tooltipArrow.style.transform = 'translateX(-50%)'
    tooltipArrow.style.width = '0'
    tooltipArrow.style.height = '0'
    tooltipArrow.style.borderLeft = '6px solid transparent'
    tooltipArrow.style.borderRight = '6px solid transparent'
    tooltipArrow.style.borderTop = '6px solid #35383C'

    tooltip.appendChild(tooltipArrow)

    if (binding.modifiers.copy) {
      const separator = document.createElement('div') as HTMLElement
      separator.style.width = '1px'
      separator.style.backgroundColor = '#5A5A5E'
      separator.style.margin = '0 4px 0 8px'
      separator.style.height = '8px'
      separator.style.display = 'inline'

      tooltip.appendChild(separator)

      const icon = document.createElement('div') as HTMLElement

      icon.innerHTML = `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.80023 5.23771L4.8 10.5833C4.8 11.6879 5.62523 12.5917 6.6685 12.6622L6.8 12.6667L10.3315 12.6673C10.1666 13.1524 9.72228 13.5 9.2 13.5H6.4C5.07452 13.5 4 12.3807 4 11V6.41667C4 5.87232 4.33403 5.40924 4.80023 5.23771ZM10.8 3.5C11.4627 3.5 12 4.05964 12 4.75V10.5833C12 11.2737 11.4627 11.8333 10.8 11.8333H6.8C6.13726 11.8333 5.6 11.2737 5.6 10.5833V4.75C5.6 4.05964 6.13726 3.5 6.8 3.5H10.8ZM10.8 4.33333H6.8C6.57909 4.33333 6.4 4.51988 6.4 4.75V10.5833C6.4 10.8135 6.57909 11 6.8 11H10.8C11.0209 11 11.2 10.8135 11.2 10.5833V4.75C11.2 4.51988 11.0209 4.33333 10.8 4.33333Z" fill="white"/>
                        </svg>`

      icon.style.display = 'inline'
      icon.style.cursor = 'pointer'
      icon.style.transition = 'all .3s ease'
      icon.style.backgroundColor = 'transparent'
      icon.style.borderRadius = '4px'

      icon.addEventListener('click', (event) => {
        event.stopPropagation()
        navigator.clipboard.writeText(binding.value)
      })

      icon.addEventListener('mouseenter', () => {
        icon.style.backgroundColor = '#5A5A5E'
      })

      icon.addEventListener('mouseleave', () => {
        icon.style.backgroundColor = 'transparent'
      })

      tooltip.appendChild(icon)

      tooltip.style.display = 'flex'
      tooltip.style.alignItems = 'center'
    }

    el.appendChild(tooltip)

    const elRect = el.getBoundingClientRect()

    let rect = tooltip.getBoundingClientRect()

    if (rect.width > elRect.width) {
      tooltip.style.right = `-${rect.width / 2 - elRect.width / 2}px`
    } else {
      tooltip.style.right = `${-rect.width / 2}px`
    }

    tooltip.style.bottom = '100%'

    rect = tooltip.getBoundingClientRect()

    if (rect.left < 0) {
      tooltip.style.left = '0'
      tooltip.style.right = 'unset'
      tooltipArrow.style.left = `${elRect.width - 10}px`
    } else if (rect.right > document.documentElement.clientWidth) {
      tooltip.style.left = 'unset'
      tooltipArrow.style.right = `${elRect.width - 10}px`
      tooltip.style.right = '0'
    }

    tooltip.style.visibility = 'unset'
    tooltip.style.display = 'none'
    tooltip.style.zIndex = '99999'

    el.addEventListener('mouseenter', () => {
      tooltip.style.display = 'flex'
    })
    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none'
    })
  },
}
