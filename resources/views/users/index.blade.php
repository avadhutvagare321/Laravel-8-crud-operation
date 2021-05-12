@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <a class="btn btn-success float-right" href="{{ route('users.create') }}" title="Create a user"> <i class="fa fa-plus-circle"></i></a>
            <h2>Laravel 8 User CRUD Example </h2>
            <hr>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    {{ $message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            @endif

            <table class="table table-bordered">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                </tr>
                @foreach ($users as $key => $user)
                    <tr>
                        <td>{{ $key+1 }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->created_at }}</td>
                        <td>
                            <form class="userDelForm" action="{{ route('users.destroy',$user) }}" method="POST">

                                <a href="javascript:void(0)" title="show">
                                    <i class="fa fa-eye text-success  fa-lg"></i>
                                </a>

                                <a href="{{ route('users.edit', $user) }}" title="edit">
                                    <i class="fa fa-edit  fa-lg"></i>
                                </a>

                                @csrf
                                @method('DELETE')

                                <button class="delete-user" type="submit" title="delete" style="border: none; background-color:transparent;">
                                    <i class="fa fa-trash fa-lg text-danger"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </table>

            {!! $users->links() !!}
        </div>
    </div>
</div>
@endsection
