import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent} from './components/menu-bar/menu-bar.component'
import { MenuTitleComponent } from './components/menu-title/menu-title.component';
import { MenuDescriptionComponent } from './components/menu-description/menu-description.component';
import{ HomeComponent}from './pages/home/home.component';
import { StartComponent } from './components/start-button/start.component';
import { ContentComponent } from './pages/content/content.component';
import { DinamicAddComponent } from './components/dinamic-add/dinamic-add.component';
import { ShoppingListService } from './services/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuTitleComponent,
    MenuDescriptionComponent,
    HomeComponent,
    StartComponent,
    ContentComponent,
    DinamicAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
