# App Store (ASC) — checklist de aprobación

Estado de los textos legales (web): **listos**. Privacy `/privacy`, Terms/EULA `/terms`
(incluye divulgación de renovación automática + cláusulas mínimas de Apple + ley aplicable),
soporte `/support`. EN en `/`, ES en `/es/`.

Lo que falta / hay que verificar antes de enviar a revisión:

## App Store Connect (metadata)
- [ ] **Privacy Policy URL** → `https://inkprep.app/privacy`
- [ ] **EULA** → estándar de Apple, o Custom EULA con `https://inkprep.app/terms`
- [ ] **App Privacy ("nutrition label")**: declarar datos recogidos (email, contenido
      subido, compras) y si hay tracking — debe coincidir con la Política de Privacidad.
- [ ] **Suscripción IAP**: nombre localizado, duración, grupo y precio creados y en
      estado "Ready to Submit".
- [ ] Edad mínima coherente con "herramienta para adultos".
- [ ] Notas de revisión: input = diseños digitales, NO fotos de tatuajes; cuenta demo.

## Binario de la app — Guideline 3.1.2 (causa #1 de rechazo)
- [ ] Pantalla de compra muestra junto al botón: **título, duración y precio** de la suscripción.
- [ ] Texto de **renovación automática** visible antes de comprar.
- [ ] Enlaces **funcionales** (tocables) a Términos y Privacidad en esa misma pantalla.
- [ ] **Restaurar compras** y flujo StoreKit/RevenueCat correcto.

## Funcionalidad obligatoria
- [ ] **Borrar cuenta** accesible dentro de la app (Settings).
- [ ] **Sign in with Apple** si se ofrece login con Google (Apple lo exige).
- [ ] Login probable por los revisores (o cuenta demo en notas de revisión).

## Web — rellenar placeholders al publicar (src/config.ts)
- [ ] `APP_STORE_URL` real y `APP_STORE_AVAILABLE = true`.
- [ ] Confirmar región de almacenamiento real (web dice Zúrich/Suiza → debe ser cierto en Supabase).
- [ ] `ANALYTICS_DOMAIN` si se activa Plausible.

> Reglas de copy del proyecto: sin precios ni "free/gratis" en la web (el precio vive solo
> en la App Store). El texto legal de Apple NO requiere cifra, por eso es compatible.
