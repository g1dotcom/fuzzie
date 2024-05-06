import { PrismaClient } from '@prisma/client'

// Global bir değişken bildirimi yapılıyor.
// Bu değişken, tüm dosyaların erişebileceği şekilde 'global' olarak tanımlanıyor.
declare global {
  var prisma: PrismaClient | undefined
}

// 'db' adında bir sabit oluşturuluyor.
// Bu sabit, 'globalThis.prisma' değişkeninin değerini alıyor.
// Eğer 'globalThis.prisma' değişkeni tanımlı değilse, yeni bir PrismaClient örneği oluşturuluyor.
export const db = globalThis.prisma || new PrismaClient()

// Eğer 'NODE_ENV' değişkeni 'production' değilse,
// 'globalThis.prisma' değişkeni 'db' sabitine eşitleniyor.
// Bu, geliştirme ortamında her yerde 'prisma' değişkenine erişmek için kullanılıyor.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
