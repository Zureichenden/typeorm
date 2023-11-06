import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Prestamo } from './Prestamo';

@Entity('amortizaciones')
export class Amortizacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Prestamo)
  @JoinColumn({ name: 'prestamo_id' })
  prestamo: Prestamo;

  @Column()
  quincena: number;

  @Column('date')
  fecha_pago: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monto_pago: number;

  @Column('decimal', { precision: 10, scale: 2 })
  interes_pago: number;

  @Column('decimal', { precision: 10, scale: 2 })
  abono: number;

  @Column('decimal', { precision: 10, scale: 2 })
  capital_pendiente: number;
}
