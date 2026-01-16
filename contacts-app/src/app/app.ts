import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';

const retrieveListOfContacts = async () => {
  const projection = {
    // Specify which fields should be retrieved.
    name: true,
    phones: true,
    postalAddresses: true,
  };

  const result = await Contacts.getContacts({
    projection,
  });

  return result.contacts;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('contacts-app');

  contacts: ContactPayload[] = [];

  ngOnInit(): void {
    
    retrieveListOfContacts().then((contacts) => {
      console.log('Contacts', contacts);
      this.contacts = contacts;
    });
  }

  getPhoneNumbers(contact: ContactPayload): string {
    return contact.phones?.map((phone) => phone.number).join(', ') ?? '';
  }

}
