CREATE TABLE "clientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(150) NOT NULL,
	"documento" varchar(20) NOT NULL,
	"telefono" varchar(20) NOT NULL,
	"email" varchar(150) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mecanicos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(150) NOT NULL,
	"especialidad" varchar(100) NOT NULL,
	"telefono" varchar(20) NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehiculos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"placa" varchar(10) NOT NULL,
	"marca" varchar(50) NOT NULL,
	"modelo" varchar(50) NOT NULL,
	"anio" integer NOT NULL,
	"color" varchar(30) NOT NULL,
	"cliente_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ordenes_trabajo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehiculo_id" uuid NOT NULL,
	"mecanico_id" uuid NOT NULL,
	"tipo_servicio" varchar(100) NOT NULL,
	"descripcion" text NOT NULL,
	"costo" numeric(10, 2) NOT NULL,
	"kilometraje" integer NOT NULL,
	"estado" varchar(30) DEFAULT 'PENDIENTE' NOT NULL,
	"fecha_ingreso" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "vehiculos" ADD CONSTRAINT "vehiculos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordenes_trabajo" ADD CONSTRAINT "ordenes_trabajo_vehiculo_id_vehiculos_id_fk" FOREIGN KEY ("vehiculo_id") REFERENCES "public"."vehiculos"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ordenes_trabajo" ADD CONSTRAINT "ordenes_trabajo_mecanico_id_mecanicos_id_fk" FOREIGN KEY ("mecanico_id") REFERENCES "public"."mecanicos"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clientes_documento_activo_idx" ON "clientes" USING btree ("documento") WHERE "clientes"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "vehiculos_placa_activa_idx" ON "vehiculos" USING btree ("placa") WHERE "vehiculos"."deleted_at" IS NULL;