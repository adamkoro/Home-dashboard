# Home-dashboard

## Specification

- [ ] save links (mariadb)
- [ ] check if url is available or not (realtime monitoring dashboard)
- [ ] oauth2 authentication with GitHub

## Architecture

- frontend -> Svelte-Kit
- 
- backend -> Svelte-Kit(app data only)
- database -> Mariadb(app data and user data)
- Auth provider -> Firebase with GitHub

### Database Architecture

- **links** (table)
  - id -> PK
  - name -> varchar(256)
  - url -> text
  - email -> varchar(256), unique



