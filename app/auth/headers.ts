import { Headers } from '@angular/http';

export const AuthHeaders = new Headers();
AuthHeaders.append('Accept', 'application/json');
AuthHeaders.append('Content-Type', 'application/json');

// headers.append('Content-Type', 'application/json');
// headers.append('Authorization', 'Token ' +  authService.getAuthToken());

// authHeaders.append('Allow', 'GET');
// authHeaders.append('Accept', 'application/json');
// authHeaders.append('Accept', 'application/json');
// authHeaders.append('Vary', 'Accept, Cookie');
// authHeaders.append('Content-Type', 'application/json');
// authHeaders.append('Authorization', 'Token ' + this.authService.getAuthToken());
