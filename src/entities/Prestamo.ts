import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { CatalogoMontos } from './CatalogoMontos';

@Entity('prestamos')
export class Prestamo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => CatalogoMontos)
  @JoinColumn({ name: 'monto_id' })
  monto: CatalogoMontos;

  @Column('date')
  fecha_inicio: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  interes: number;
}
