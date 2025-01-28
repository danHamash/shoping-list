import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinamic-add',
  standalone: false,
  templateUrl: './dinamic-add.component.html',
  styleUrls: ['./dinamic-add.component.css',
              './dinamic-add-responsive.component.css'
  ]
})
export class DinamicAddComponent implements OnInit {
  sections: string[] = ['alimentos', 'limpeza']; // Exemplo de seções
  newItemText: string = ''; // Texto do novo item
  lists: any = {}; // Lista de itens por seção
  totalGeral: number = 0; // Total geral, que será calculado

  // Método para inicializar os itens do localStorage
  ngOnInit(): void {
    this.sections.forEach((section) => {
      const items = JSON.parse(localStorage.getItem(section) || '[]');
      this.lists[section] = items;
    });
  }

  // Método para adicionar um item
  addItem(section: string) {
    if (!this.newItemText.trim()) {
      alert('Por favor, digite o nome do item!');
      return;
    }

    const newItem = {
      name: this.newItemText,
      quantity: 1,
      value: 0.0,
      total: 0.0,
    };

    if (!this.lists[section]) {
      this.lists[section] = [];
    }

    this.lists[section].push(newItem);
    this.saveItem(section, newItem);
    this.newItemText = ''; // Limpar o campo de input
  }

  // Método para salvar um item no localStorage
  saveItem(section: string, item: any) {
    const items = JSON.parse(localStorage.getItem(section) || '[]');
    items.push(item);
    localStorage.setItem(section, JSON.stringify(items));
  }

  // Método para atualizar um item
  updateItem(section: string, itemName: string, newQuantity: string | null, newValue: string | null) {
    let items = JSON.parse(localStorage.getItem(section) || '[]');
    const itemIndex = items.findIndex((item: { name: string }) => item.name === itemName);

    if (itemIndex >= 0) {
      if (newQuantity !== null) {
        items[itemIndex].quantity = parseInt(newQuantity, 10);
      }

      if (newValue !== null) {
        items[itemIndex].value = parseFloat(newValue);
      }

      items[itemIndex].total = items[itemIndex].quantity * items[itemIndex].value;

      localStorage.setItem(section, JSON.stringify(items));

      // Atualiza a lista local no componente
      this.lists[section] = items;
    }
  }

  // Método para excluir um item
  deleteItem(section: string, itemName: string) {
    let items = JSON.parse(localStorage.getItem(section) || '[]');
    items = items.filter((item: { name: string }) => item.name !== itemName);
    localStorage.setItem(section, JSON.stringify(items));

    this.lists[section] = items;
  }

  // Método para calcular o total geral de todos os itens
  calculateTotal() {
    let total = 0;
    for (const section of this.sections) {
      const items = this.lists[section] || [];
      total += items.reduce((sectionTotal: number, item: any) => sectionTotal + item.total, 0);
    }
    this.totalGeral = total; // Atribui o valor do total geral
  }

  // Método para compartilhar a lista
  shareList() {
    const allSections = Object.keys(this.lists);
    let sharedText = 'Lista de Compras:\n\n';

    allSections.forEach(section => {
      sharedText += `${this.capitalizeFirstLetter(section)}:\n`;
      const items = this.lists[section];
      items.forEach((item: { name: any; quantity: any; value: number; }) => {
        sharedText += `- ${item.name}: ${item.quantity} unidade(s) a R$ ${item.value.toFixed(2)}\n`;
      });
      sharedText += '\n';
    });

    if (navigator.share) {
      navigator.share({
        title: 'Minha Lista de Compras',
        text: sharedText,
      }).then(() => {
        document.getElementById('share-result')!.textContent = 'Lista enviada com sucesso!';
      }).catch(err => {
        console.error('Erro ao compartilhar:', err);
        document.getElementById('share-result')!.textContent = 'Erro ao enviar a lista.';
      });
    } else {
      navigator.clipboard.writeText(sharedText).then(() => {
        document.getElementById('share-result')!.textContent = 'Lista copiada!';
      }).catch(err => {
        console.error('Erro ao copiar:', err);
        document.getElementById('share-result')!.textContent = 'Erro ao copiar a lista.';
      });
    }
  }

  // Método para capitalizar a primeira letra da string
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
