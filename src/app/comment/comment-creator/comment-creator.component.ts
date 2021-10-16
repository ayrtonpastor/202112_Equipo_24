import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { CollectorDetail } from '../../collector/collector-detail';
import { CollectorService } from '../../collector/collector.service';
import { AlbumDetail } from "src/app/album/albumdetail";
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';


@Component({
  selector: 'app-comment-creator',
  templateUrl: './comment-creator.component.html'
})
export class CommentCreatorComponent implements OnInit {
  commentForm: FormGroup;
  collectors: CollectorDetail[];
  @Input() albumDetail: AlbumDetail;
  @Output() returnEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private collectorService: CollectorService,
    private commentService: CommentService
  ) {}

  getCollectors(): void {
    this.collectorService.getCollectors().subscribe((collectors) => {
      this.collectors = collectors;
    });
  }

  ngOnInit() {
    this.getCollectors();

    this.commentForm = this.formBuilder.group({
      description: ["", [Validators.required, Validators.minLength(1)]],
      rating: ["", Validators.required],
      collector: ["", Validators.required]
    });
  }

  createComment(newComment: Comment) {
    this.commentService.addComment(this.albumDetail.id, newComment)
    .subscribe(response => {
      this.emitReturnEvent();
      this.albumDetail.comments.push(newComment);
    });
    this.showSuccess(newComment);
    this.commentForm.reset();
  }

  showSuccess(newComment: Comment) {
    this.toastr.success('', `Su comentario fue añadido con éxito`, { "progressBar": false, timeOut: 2500 });
  }

  cancelCreation() {
    this.commentForm.reset();
    this.emitReturnEvent();
  }

  emitReturnEvent(){
    this.returnEvent.emit(false);
  }
}
