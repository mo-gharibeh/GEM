import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';

@Component({
  selector: 'app-testimonial-managrmrnt',
  templateUrl: './testimonial-managrmrnt.component.html',
  styleUrl: './testimonial-managrmrnt.component.css'
})
export class TestimonialManagrmrntComponent {

  testimonials: any[] = [];

  constructor(private testimonialService: UrlService) { }

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials(): void {
    this.testimonialService.getAllTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }

  changeStatus(testimonialId: number): void {
    this.testimonialService.changeStatus(testimonialId).subscribe(() => {
      this.getTestimonials(); // Refresh the list after changing status
    });
  }

  deleteTestimonial(testimonialId: number): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialService.deleteTestimonial(testimonialId).subscribe(() => {
        this.testimonials = this.testimonials.filter(t => t.testimonialid !== testimonialId);
      });
    }
  }

}
